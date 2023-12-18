from PIL import Image, ImageDraw, ImageFont
import imageio.v2 as imageio
import json
import uuid
import moviepy.editor as mp

def create_gif_with_korean_text(text, json_path, frames_path, output_path):
    # Read the JSON file
    with open(json_path, 'r') as file:
        json_data = json.load(file)

    frames = []

    for frame_data in json_data:
        # Load the image
        image_path = f"{frames_path}/{frame_data['imageName']}"
        image = Image.open(image_path)

        # Draw the text
        draw = ImageDraw.Draw(image)
        font_size = frame_data['bounding_box']['height']
        font = ImageFont.truetype('./resources/NotoSansKR-Bold.ttf', int(font_size / 2))

        bbox = frame_data['bounding_box']
        draw.text((bbox['left'], bbox['top']), text, fill="black", font=font)

        # Save the frame
        temp_path = f"{frames_path}/temp_{frame_data['imageName']}"
        image.save(temp_path)
        frames.append(imageio.imread(temp_path))

    # Create GIF
    filename = output_path + uuid.uuid4().hex + '.gif'
    
    imageio.mimsave(filename, frames, duration=0.06)  # Duration in seconds per frame
    clip = mp.VideoFileClip(filename)
    clip.write_videofile(filename.replace('.gif', '.mp4'), bitrate="5000k")
    
    # remove gif file
    import os
    os.remove(filename)

    # sysout the filename
    print("GIF file created: ")
    print(filename.replace('.gif', '.mp4'))

if __name__ == '__main__':
    # take text argument
    import sys
    text = sys.argv[1]
    create_gif_with_korean_text(text, './resources/data.json', './resources/frames', './output/')