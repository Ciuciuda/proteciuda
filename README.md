# Dokumentacja techniczna programu Proteciuda
Proteciuda to aplikacja desktopowa służąca do ekstrakcji białek z kodu RNA i ich późniejszej analizy. Program został stworzony w ramach konkursu Motorola Science Cup 2022 jako zadanie z dziedziny bioinformatyki.


## Spis treści
- [Dokumentacja techniczna programu Proteciuda](#dokumentacja-techniczna-programu-proteciuda)
  - [Spis treści](#spis-treści)
  - [Instalacja](#instalacja)
  - [Funkcjonalności programu](#funkcjonalności-programu)
  - [Architektura programu](#architektura-programu)
        - [Program składa się z dwóch głównych modułów:](#program-składa-się-z-dwóch-głównych-modułów)
  - [Nasze doświadczenia](#nasze-doświadczenia)
      - [Research](#research)
      - [Praca w zespole](#praca-w-zespole)


## Instalacja
Uruchamiamy plik *proteciuda.msi* i postępujemy zgodnie z kreatorem.


## Funkcjonalności programu
Program pozwala na wczytanie sekwencji RNA, wyodrębnienie z niej poszczególnych białek i wyświetlenie ich wzorów strukturalnych. Ponadto program oblicza masę danego białka.


## Architektura programu
Program został stworzony w języku Rust z wykorzystaniem frameworka Tauri.

##### Program składa się z dwóch głównych modułów:
 - Frontend: interfejs użytkownika napisany w języku HTML, CSS oraz JavaScript z wykorzystaniem frameworka React i biblioteki React Router.
 - Backend: serwer napisany w języku Rust z wykorzystaniem frameworka Tauri.

## Nasze doświadczenia
#### Research 
Zrozumienie zasad łączenia się aminokwasów okazało się niemałym wyzwaniem. Aby osiągnąć zamierzony efekt wykorzystaliśmy koncept z tzw. l-systemów, służących do generacji struktur pseudo-organicznych, takich jak liście czy drzewa. 
Wiedzę potrzebną do stworzenia algorytmu odpowiedzialnego za ekstrakcję i przetwarzanie poszczególnych aminokwasów, zaczerpneliśmy z najróżniejszych źródeł. Zaczynając od angielskojezycznych filmów na platformie youtube, poprzez rozmaite artykuły, a kończąc na podręczniku do biochemii.
Wymagało to dużej determinacji i wytrwałościm, gdyż nie mieliśmy nikogo kto mógłbym nam to najzwyczajniej wytłumaczyć.
#### Praca w zespole
Początkowo wszyscy rwali się do pracy, co zaowocowało przepięknym desiginem aplikacji oraz decyzjami co do architerktury i technologii wykorzystanej w projekcie. Jednak z biegiem czasu początkowy etnuzjazm zmalał i projekt praktycznie stanął w miejscu. Należy również zaznaczyć że nas zespół składa się w większości z bardzo poczatkujących adpetów programowania. Doprowadziło to do trudności w osiąganiu postępów. 
Wraz ze zbliżaniem się terminu oddania zebraliśmy wszystko co do tej pory zrobiliśmy i wyznaczeliśmy sobie osiągalny cel. Chociaż nie wykonaliśmy całości, to udało nam się zdobyć trochę wiedzy z zakresu technologi oraz biochemii, a najcenniejszą lekcją  będzie dla nas utrzymanie motywacji oraz konsekwentne dążenie do ustalonych jako zespół celów. 