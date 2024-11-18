export default function getFirstNWords(paragraph: string, n: number) {
  if (paragraph == undefined) return "";
  const words = paragraph.split(" ");
  return words.slice(0, n).join(" ");
}
