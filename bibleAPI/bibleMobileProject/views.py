from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import VerseSerializer

from .models import Book, Chapter, Verse



def get_bible(request):

    # books = Book.objects.all()
    # for book in books:
        # chapters = Chapter.objects.filter(book=book.id)
        # print(chapters)
        # print(book.id)  
    # print(books)

    verses = Verse.objects.all()
    # for verse in verses:
    #     print(verse.chapter.book.book_title)
    serializer = VerseSerializer(verses, many=True)
    for i in serializer.data:
        print(i)
    # j = JsonResponse(verses, safe=False)
    # print(j.content)
    # print(verses)
    return HttpResponse('ok')

# @api_view(['GET'])
# def article_list(request):
#     if request.method == 'GET':
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many=True)
#         return Response(serializer.data)

    