import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn:'root'
})

export class EncryptDecryptService{
    constructor(){}

    set(keys,value){
        let key = CryptoJS.enc.Utf8.parse(keys)
        let iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(value),key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        )
        return encrypted.toString()
    }

    get(keys, value){
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}