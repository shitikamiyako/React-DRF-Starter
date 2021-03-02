from django.urls import re_path, path
from . import views

# Reactのルーティングをそのままこちらに持ってきて紐付けている。
# re_pathの部分はReactにおいて:idや:usernameを使っている部分の表現がパスコンバーターではできないのでこちらを使っています。
urlpatterns = [
    path('', views.index, name='index_page'),
    path('Login/', views.index, name='other_page'),
    path('SignUp/', views.index, name='other_page'),
    path('Logout/', views.index, name='other_page'),
    # path('todo/top/', views.index, name='other_page'),
    # path('todo/list/', views.index, name='other_page'),
    # re_path(r'^todo/list/[^/]+/$', views.index, name='other_page'),
    # re_path(r'^todo/delete/[0-9]+/$', views.index, name='other_page'),
    # re_path(r'^todo/edit/[0-9]+/$', views.index, name='other_page'),
    # re_path(r'^todo/timer/[0-9]+/$', views.index, name='other_page'),
    # path('user_info/', views.index, name='other_page'),
    # path('password_change/', views.index, name='other_page'),
    # path('unsubscribe/', views.index, name='other_page'),
    # path('user_group/top/', views.index, name='other_page'),
    # re_path(r'^user_group/edit/[0-9]+/$', views.index, name='other_page'),
    # re_path(r'^user_group/delete/[0-9]+/$', views.index, name='other_page'),
    # re_path(r'^user_group/[0-9]+/members/$', views.index, name='other_page'),
    # path('user_group/joined/', views.index, name='other_page'),
    # re_path(r'^user_group/list/[^/]+/$', views.index, name='other_page'),
]
