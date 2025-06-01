# Initialize visual_data as an empty dictionary
visual_data = {
    "categories": [],
    "values": []
}

def get_visual_data():
    return visual_data

def add_visual_data(category, value):
    visual_data['categories'].append(category)
    visual_data['values'].append(value)

def delete_visual_data(category):
    if category in visual_data['categories']:
        index = visual_data['categories'].index(category)
        visual_data['categories'].pop(index)
        visual_data['values'].pop(index)
