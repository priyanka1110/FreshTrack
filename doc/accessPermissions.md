### Android

* android.permission.NFC-   nfc plugin
* android.permission.VIBRATE  -   vibrate plugin
* android.permission.CAMERA  -  barcodescanner plugin
* android.permission.FLASHLIGHT - barcodescanner  plugin 

Below three are set by default from cordova
* [android.permission.INTERNET](http://developer.android.com/reference/android/Manifest.permission.html#INTERNET)
* [android.permission.ACCESS_NETWORK_STATE](http://developer.android.com/reference/android/Manifest.permission.html#ACCESS_NETWORK_STATE)
* [android.permission.ACCESS_WIFI_STATE](http://developer.android.com/reference/android/Manifest.permission.html#ACCESS_WIFI_STATE)

### Windows Phone

* proximity - nfc plugin
* webcam - barcodescanner plugin

Below is set by default from cordova
* internetClient

    On Windows, this provides access to your Internet connection for outgoing connections to the Internet. On Windows Phone, provides full local and internet access and can act as a server, but inbound access to critical ports is always blocked.
