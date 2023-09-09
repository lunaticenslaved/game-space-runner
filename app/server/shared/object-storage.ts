import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import { randomUUID } from 'node:crypto';

import {
  OBJECT_STORAGE_AVATARS_KEY_ID,
  OBJECT_STORAGE_AVATARS_NAME,
  OBJECT_STORAGE_AVATARS_SECRET,
  OBJECT_STORAGE_REGION,
} from '@server/shared/constants';

type ObjectStorageConstructor = {
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
};

const storageEndpoint = 'https://storage.yandexcloud.net';

class ObjectStorage {
  private client: S3Client;
  private bucketName: string;

  constructor({ bucketName, ...props }: ObjectStorageConstructor) {
    this.bucketName = bucketName;
    this.client = new S3Client({
      credentials: props,
      region: OBJECT_STORAGE_REGION,
      endpoint: storageEndpoint,
    });
  }

  async uploadFile(file: UploadedFile) {
    const fileName = `${randomUUID()}_${file.name}`;
    const params = {
      Bucket: this.bucketName,
      Body: file.data,
      Key: fileName,
    };

    const link = `${storageEndpoint}/${OBJECT_STORAGE_AVATARS_NAME}/${fileName}`;

    await this.client.send(new PutObjectCommand(params));
    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key,
    );

    await this.client.config;

    return { link };
  }
}

export const objectStorage = {
  avatar: new ObjectStorage({
    bucketName: OBJECT_STORAGE_AVATARS_NAME,
    accessKeyId: OBJECT_STORAGE_AVATARS_KEY_ID,
    secretAccessKey: OBJECT_STORAGE_AVATARS_SECRET,
  }),
};
