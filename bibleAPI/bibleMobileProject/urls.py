
from django.conf import settings
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VerseViewSet, BookViewSet
# from django.conf import setting
# from django.conf.urls.static import static


router = DefaultRouter()
router.register('verses', VerseViewSet, basename='verses')
router.register('books', BookViewSet, basename='book')


urlpatterns = [
    # path('', include(router.urls)),


    path('api/', include(router.urls)),
    # path('articles/<int:id>/', ArticleDetails.as_view()),


    # path('articles/', article_list),
    # path('articles/<int:pk>/', article_details),
]  

# urlpatterns += static(settings.MEDIA_URL, document = settings.MEDIA_ROOT)