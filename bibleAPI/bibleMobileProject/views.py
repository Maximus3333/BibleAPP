from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .serializers import VerseSerializer, BookSerializer
from rest_framework import viewsets


from .models import Book, Chapter, Verse


# @api_view(['GET'])
# def get_bible(request):

#     # books = Book.objects.all()
#     # for book in books:
#         # chapters = Chapter.objects.filter(book=book.id)
#         # print(chapters)
#         # print(book.id)  
#     # print(books)

#     verses = Verse.objects.order_by('book', 'chapter', 'verse')
#     # print(verses[0:25])
#     # for verse in verses[0:50]:
#     #     print(verse)
#     serializer = VerseSerializer(verses[0:20], many=True)
#     for i in serializer.data:
#         print(i)
#     # j = JsonResponse(verses, safe=False)
#     # print(j.content)
#     # print(verses)
#     return HttpResponse('ok')

# @api_view(['GET'])
# def article_list(request):
#     if request.method == 'GET':
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many=True)
#         return Response(serializer.data)


class VerseViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = Verse.objects.order_by('book', 'chapter', 'verse') 
    serializer_class = VerseSerializer

class BookViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Book.objects.order_by('id')  
    serializer_class = BookSerializer

