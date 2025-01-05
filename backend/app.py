from flask import Flask,jsonify,request
from config import Config
from googleapiclient.discovery import build
import pandas as pd
from flask_cors import CORS 

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

youtube = build('youtube','v3',developerKey = Config.API_KEY)

def get_channelId(youtube, channel_name):
    try:
        request = youtube.search().list(
            part="snippet",
            q=channel_name,
            type="channel",
            maxResults=1
        )
        response = request.execute()
        if 'items' not in response or len(response['items']) == 0:
            raise ValueError("No channel found with the given name")
        
        return [response['items'][0]['snippet']['channelId']]
    
    except Exception as e:
        raise


def get_channel_stats(youtube, channel_id):
        request = youtube.channels().list(
            part="snippet,contentDetails,statistics",
            id = channel_id)
        response = request.execute()
        data = dict(Channel_Name = response['items'][0]['snippet']['title'],
                    Channel_id = channel_id,
                    Description = response['items'][0]['snippet']['description'],
               Subscribers = response['items'][0]['statistics']['subscriberCount'],
               Videos = response['items'][0]['statistics']['videoCount'],
               Views = response['items'][0]['statistics']['viewCount'],
                Profile = response['items'][0]['snippet']['thumbnails']['high']['url'],
                Uploads = response['items'][0]['contentDetails']['relatedPlaylists']['uploads'])
        return data

def get_video_id(youtube,play_list_id):
    request = youtube.playlistItems().list(
        part='contentDetails',
        playlistId=play_list_id,
        maxResults=50)
    response = request.execute()

    video_ids = []
    for i in range(len(response['items'])):
        video_ids.append(response['items'][i]['contentDetails']['videoId'])

    more_page_token = response.get('nextPageToken')
    next_page = True

    while next_page:
        if more_page_token is None:
            next_page = False
        else:
            request = youtube.playlistItems().list(
                part='contentDetails',
                playlistId=play_list_id,
                maxResults=50,
                pageToken=more_page_token)
            
            response = request.execute()
            
            for i in range(len(response['items'])):
                video_ids.append(response['items'][i]['contentDetails']['videoId'])

            more_page_token = response.get('nextPageToken')

    return video_ids


def get_video_details(youtube,video_ids):
    all_videos_stats = []
    for i in range(0,len(video_ids),50):
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=','.join(video_ids[i:i+50]))
        response = request.execute()

        for videos in response['items']:
            video_stats = dict(Title= videos['snippet']['title'],
                               Thumbnail = videos['snippet']['thumbnails']['high']['url'],
                               Video_id = videos['id'],
                               Publish_date=videos['snippet']['publishedAt'],
                               Views= videos['statistics'].get('viewCount', 0),
                               Likes= videos['statistics'].get('likeCount', 0),
                               Comments= videos['statistics'].get('commentCount', 0))

            all_videos_stats.append(video_stats)


    

    return all_videos_stats



@app.route('/api/youtube', methods=['GET'])
def youtube_data():
    channel_name = request.args.get('channel_name')
    if not channel_name:
        return jsonify({"error": "No channel name provided"}), 400
    
    try:
        channel_id = get_channelId(youtube, channel_name)
        if not channel_id:
            return jsonify({"error": "No channel found with the given name"}), 404
        
        channel_stats = get_channel_stats(youtube, channel_id[0])
        return jsonify(channel_stats)
    
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404    #error
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500



@app.route('/api/youtube/uploads', methods=['GET'])
def getVideoStats():
    upload_id = request.args.get('upload_id')
    if not upload_id:
        return jsonify({"error": "No upload ID provided"}), 400
    
    try:
        videoIds = get_video_id(youtube, upload_id)
        if not videoIds:
            return jsonify({"error": "No videos found"}), 404
        
        video_data = get_video_details(youtube, videoIds)
        video_data = pd.DataFrame(video_data)
        video_data['Publish_date'] = pd.to_datetime(video_data['Publish_date']).dt.date
        video_data['Likes'] = pd.to_numeric(video_data['Likes'], errors='coerce').fillna(0)
        video_data['Views'] = pd.to_numeric(video_data['Views'], errors='coerce').fillna(0)
        video_data['Comments'] = pd.to_numeric(video_data['Comments'], errors='coerce').fillna(0)
        top_videos = video_data.sort_values(by='Views', ascending=False).head(10).to_dict(orient='records')
        return jsonify(top_videos)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  #error



