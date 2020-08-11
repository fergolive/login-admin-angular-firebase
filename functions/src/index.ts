import * as functions from 'firebase-functions';
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs-extra';
import { object } from 'firebase-functions/lib/providers/storage';

const storage = new Storage();

export const  optimizeImages = functions.storage
.object()
.onFinalize(async object=>{
    console.log('upload file man');
    
})

