from django.shortcuts import render
from rest_framework import viewsets, permissions
from core.serializers import PostSerializer
from todoapp.models import Post

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return posts belonging to the current user
        return Post.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate new posts with the current user
        serializer.save(user=self.request.user)