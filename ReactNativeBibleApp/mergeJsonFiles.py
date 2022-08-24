import os
import json
base_dir = 'C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible'

#Get all files in the directory

data_list = []
for file in os.listdir(base_dir):

    #If file is a json, construct it's full path and open it, append all json data to list
    if 'json' in file:
        json_path = os.path.join(base_dir, file)
        # print(json_path)
        with open(json_path, 'r') as infile:
            # print(json.load(infile))
            data_list.append(json.load(infile))

with open('C:/Users/mdeis/ProgrammingProjects/bibleApp/ReactNativeBibleApp/Bible/CompleteBible.json', 'w') as output_file:
        json.dump(data_list, output_file)



