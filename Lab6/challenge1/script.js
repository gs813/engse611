// เลือกพารากราฟทั้งหมดที่อยู่ภายใน div
var paragraphsInsideDiv = document.querySelectorAll('div p');

// ใช้ forEach เพื่อลูปแต่ละพารากราฟและเปลี่ยนแปลงสไตล์
paragraphsInsideDiv.forEach(function(paragraph) {
    paragraph.style.fontSize = '24px';
    paragraph.style.color = 'red';
});
