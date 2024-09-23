# 沖縄語辞典 PWA
沖縄語辞典の android と iOS 向けのネイティブを生成するためのリポジトリです。

# Android Build
以下の順でandroid native を生成して、android studio を呼ぶ。
```
ionic build
ionic cap copy
ionic cap open android
```

# 沖縄語辞典のデータ
国立国語研究所作成の『沖縄語辞典』と『うちなーぐち活用辞典』のデータを JSON 化したデータを使用しています。
https://github.com/hissanova/okinawago_dictionary