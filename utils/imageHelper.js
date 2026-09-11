export function getImageBySize(blogImage, size) {
  if (blogImage?.length !== 0) {
    return (blogImage.find(img => img.ImageSize === ImageSizeEnum[size]) || {}).Url
  }
}

export async function imageUrlToFile(imageUrl, fileName) {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
