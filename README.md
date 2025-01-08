# Web To-Do List

Project นี้เป็นWeb To-Do List เว็บที่มีระบบล็อกอิน, ระบบสมัครสมาชิก, ระบบ To-Do List และระบบแก้ไขโปรไฟล์ผู้ใช้

## คุณสมบัติของแอป
1. **ระบบสมัครสมาชิก (Sign-Up)**:
   - ผู้ใช้สามารถสมัครสมาชิกใหม่ด้วยการกรอกชื่อผู้ใช้, อีเมล, และรหัสผ่าน
   - จากนั้นระบบจะบันทึกข้อมูลผู้ใช้ลงในฐานข้อมูล

2. **ระบบล็อกอิน (Login)**:
   - ผู้ใช้สามารถล็อกอินเข้าสู่ระบบด้วยชื่อผู้ใช้และรหัสผ่าน
   - ระบบใช้ Session เพื่อจัดการการยืนยันตัวตน

3. **ระบบ To-Do List**:
   - ผู้ใช้สามารถเพิ่ม, แก้ไข, และลบรายการที่ต้องทำ
   - ระบบจะแสดงรายการ To-Do ทั้งหมดของผู้ใช้ที่ล็อกอินอยู่

4. **ระบบแก้ไขโปรไฟล์ (Profile Edit)**:
   - ผู้ใช้สามารถแก้ไขข้อมูลส่วนตัว เช่น ชื่อ, อีเมล ได้
   - ระบบรองรับการอัพโหลดรูปโปรไฟล์ใหม่
