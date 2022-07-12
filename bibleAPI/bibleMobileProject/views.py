from django.shortcuts import render
from django.http import HttpResponse

from .models import Book, Chapter, Verse



def get_bible(request):

    # books = Book.objects.all()
    # for book in books:
        # chapters = Chapter.objects.filter(book=book.id)
        # print(chapters)
        # print(book.id)  
    # print(books)

    verse = Verse.objects.all()
    print(verse)
    return HttpResponse('ok')

    