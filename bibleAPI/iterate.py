import os, json
from pathlib import Path


directory = r"C:\Users\mdeis\Downloads\Bible-kjv-master\Bible-kjv-master"
list_of_books = []
for filename in os.scandir(directory):
    if filename.is_file():
            with open(r""+filename.path) as json_file:
                    data = json.load(json_file)
                    # print(str(data))
                    list_of_books.append(data)
                    # data = str(data)
                    # data2 = ""
                    # for i, letter in enumerate(data):
                    #         if i% 150 == 0:
                    #                 data2 += '\n'
                    #         data2+=letter
                    # data2 = data2[1:] + '\n' + '\n' + '\n'
                    # # file_name = os.path.basename(filename.path)
                    # # print(os.path.splitext(file_name[0]))
                    # print(Path(filename.path).stem)
                    # path_name = Path(filename.path).stem


                    # with open(r"C:\Users\mdeis\ProgrammingProjects\bibleApp\bibleAPI\bibleBooks\ " + path_name + ".txt", 'w') as textfile:
                    #     textfile.write(data2)
                    #     textfile.close()

# print(list_of_books)