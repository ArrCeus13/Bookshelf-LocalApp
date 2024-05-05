# Bookshelf Apps

Bookshelf Apps adalah aplikasi web sederhana yang memungkinkan pengguna untuk mengelola daftar buku mereka. Pengguna dapat menambahkan buku baru, memindahkan buku antar rak, dan menghapus buku dari rak. Berikut adalah kriteria utama Bookshelf Apps:

## Kriteria 1: Menambahkan Data Buku

Bookshelf Apps mampu menambahkan data buku baru ke dalam rak. Setiap buku yang ditambahkan akan disimpan sebagai objek JavaScript dengan struktur sebagai berikut:

```javascript
{
  id: string | number,
  title: string,
  author: string,
  year: number,
  isComplete: boolean,
}
```
Contoh data buku:
```javascript
{
  id: 3657848524,
  title: 'Harry Potter and the Philosopher\'s Stone',
  author: 'J.K Rowling',
  year: 1997,
  isComplete: false,
}
```

## Kriteria 2: Dua Rak Buku
Bookshelf Apps memiliki dua rak buku: "Belum selesai dibaca" dan "Selesai dibaca". Rak "Belum selesai dibaca" hanya menyimpan buku dengan properti isComplete bernilai false, sedangkan rak "Selesai dibaca" hanya menyimpan buku dengan properti isComplete bernilai true.

## Kriteria 3: Memindahkan Buku antar Rak
Pengguna dapat memindahkan buku antar rak, baik dari rak "Belum selesai dibaca" ke rak "Selesai dibaca" atau sebaliknya.

## Kriteria 4: Menghapus Data Buku
Pengguna dapat menghapus buku dari rak, baik dari rak "Belum selesai dibaca" maupun "Selesai dibaca".

## Kriteria 5: Manfaatkan localStorage
Data buku yang ditampilkan pada rak dapat bertahan meskipun halaman web ditutup. Karena Bookshelf Apps menggunakan localStorage untuk menyimpan data buku.




