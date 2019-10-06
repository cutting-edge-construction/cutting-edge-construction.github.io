from urllib.request import urlopen
from urllib.request import urlretrieve
from bs4 import BeautifulSoup
from PIL import Image
import os


def scale_image(input_image_path,
				output_image_path,
				width=None,
				height=None
				):
	original_image = Image.open(input_image_path)
	w, h = original_image.size
	print('The original image size is {wide} wide x {height} '
		  'high'.format(wide=w, height=h))
 
	if width and height:
		max_size = (width, height)
	elif width:
		max_size = (width, h)
	elif height:
		max_size = (w, height)
	else:
		# No width or height specified
		raise RuntimeError('Width or height required!')
 
	original_image.thumbnail(max_size, Image.ANTIALIAS)
	original_image.save(output_image_path)
 
	scaled_image = Image.open(output_image_path)
	width, height = scaled_image.size
	print('The scaled image size is {wide} wide x {height} '
		  'high'.format(wide=width, height=height))



urls = [
	"http://cutting-edge.construction/project-photos/bathrooms/",
	"http://cutting-edge.construction/project-photos/commercial/",
	"http://cutting-edge.construction/project-photos/kitchens/",
	"http://cutting-edge.construction/project-photos/outdoor-live-spaces/",
	"http://cutting-edge.construction/project-photos/remodel/",
	"http://cutting-edge.construction/project-photos/additions/",
]

for url in urls:
	html = urlopen(url)
	soup = BeautifulSoup(html)
	dir_name = url.split("/")[4]
	if os.path.exists(dir_name) is False:
		os.mkdir(dir_name)

	imgs = soup.findAll("div", {"class":"image"})
	for img in imgs:
			imgUrl = img['style'][22:-2]
			fname = dir_name + "/" + img['id'] + ".jpg"
			print("getting ",imgUrl," as ",fname)
			urlretrieve(imgUrl, fname)
			print("scaling")
			scale_image(fname,fname,1000,1000)


	print(len(imgs))


