from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics, status
from django.conf import settings
from deploy.models import RequestEntry
from deploy.serializers import RequestEntrySerializerEdit,RequestEntrySerializerView
import os
from datetime import datetime
import random



class ExecutionDetails(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        service_name=""
        last_execution_id=""
        application_version=""
        deployment_type="normal"

        if os.getenv('APPLICATION_VERSION'):
            application_version= os.getenv('APPLICATION_VERSION')


        if os.getenv('SERVICE_NAME'):
            service_name= os.getenv('SERVICE_NAME')

        if os.getenv('LAST_EXECUTION_ID'):
            last_execution_id= os.getenv('LAST_EXECUTION_ID')

        if os.getenv('HOSTNAME'):
            if 'canary' in os.getenv('HOSTNAME'):
                deployment_type = 'canary'


        payload={
        "service_name": service_name,
        "last_execution_id": last_execution_id,
        "application_version": application_version,
        "deployment_type": deployment_type
        }
        return JsonResponse(payload,safe=False)

class RequestEntryCreate(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RequestEntrySerializerEdit

    def perform_create(self, serializer):
        # Customize creation behavior here
        # For example, generate a name based on some logic
        if hasattr(settings, 'DEPLOYMENT_VARIABLE') and settings.DEPLOYMENT_VARIABLE:
            if 'canary' in settings.DEPLOYMENT_VARIABLE:
                deployment_type = 'canary'
            else:
                deployment_type= 'normal'
        else:
            deployment_type= 'normal'

        deployment_type=deployment_type
        serializer.save(name=deployment_type)


class ViewDiagram(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RequestEntrySerializerView
    def list(self,request):
        start_timestamp = str(request.GET.get('start_timestamp'))
        end_timestamp = str(request.GET.get('end_timestamp'))
        # Convert timestamps to datetime objects
        start_datetime = datetime.strptime(start_timestamp, '%Y-%m-%dT%H:%M:%S.%fZ')
        end_datetime = datetime.strptime(end_timestamp, '%Y-%m-%dT%H:%M:%S.%fZ')
        start_datetime = timezone.make_aware(start_datetime)
        end_datetime =timezone.make_aware(end_datetime)

        data = RequestEntry.objects.filter(created_at__range=(str(start_datetime), str(end_datetime)))
        serialiser = RequestEntrySerializerView(data,many=True)
        return JsonResponse(serialiser.data,safe=False)


class ViewBarDiagram(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RequestEntrySerializerView
    def list(self,request):
        start_timestamp = str(request.GET.get('start_timestamp'))
        end_timestamp = str(request.GET.get('end_timestamp'))
        # Convert timestamps to datetime objects
        start_datetime = datetime.strptime(start_timestamp, '%Y-%m-%dT%H:%M:%S.%fZ')
        end_datetime = datetime.strptime(end_timestamp, '%Y-%m-%dT%H:%M:%S.%fZ')
        start_datetime = timezone.make_aware(start_datetime)
        end_datetime =timezone.make_aware(end_datetime)

        data = list(RequestEntry.objects.filter(created_at__range=(str(start_datetime), str(end_datetime))).values('name','created_at'))



        serialiser = RequestEntrySerializerView(data,many=True)
        return JsonResponse(data,safe=False)





class checkRelease(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        if hasattr(settings, 'DEPLOYMENT_VARIABLE') and settings.DEPLOYMENT_VARIABLE:
            if 'canary' in settings.DEPLOYMENT_VARIABLE:
                deployment_type = 'canary'
            else:
                deployment_type= 'normal'
        else:
            deployment_type= 'normal'
        payload={
           "deployment_type": deployment_type
        }
        return JsonResponse(payload,safe=False)