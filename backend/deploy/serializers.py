from rest_framework import serializers
import os
from deploy.models import RequestEntry
DEPLOYMENT = os.getenv('DEPLOYMENT_STATE=')
from datetime import datetime

class EpochTimeField(serializers.Field):
    def to_representation(self, value):
        return int(value.timestamp())

class RequestEntrySerializerEdit(serializers.ModelSerializer):
        class Meta:
            model = RequestEntry
            fields = ['name', 'created_at']
        def to_representation(self, instance):
            representation = super().to_representation(instance)
            # Convert the 'created_at' field to epoch timestamp
            if 'created_at' in representation:
                representation['created_at'] = int(time.mktime(instance.created_at.timetuple()))
            return representation


class RequestEntrySerializerView(serializers.ModelSerializer):
    created_at = EpochTimeField()
    class Meta:
        model = RequestEntry
        fields = ['name','created_at']





