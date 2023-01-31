#!/bin/sh

rand=$(echo $RANDOM | md5sum | head -c 8)
filename="checksum-$rand.tar"

rm -f $filename

tar --exclude $1/dist --exclude $1/build --mtime='2021-01-01 00:00Z' -cf $filename $1

sum=$(sha256sum $filename | cut -d ' ' -f 1)

rm -f $filename

echo $sum
