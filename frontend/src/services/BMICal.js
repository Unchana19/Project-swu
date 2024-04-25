export const BMICal = (weight, height) => {
  if (weight > 0 && height > 0) {
    const BMI = (weight / ((height / 100) * (height / 100))).toFixed(2);
    let status = "";
    switch (true) {
      case (BMI < 18.5):
        status = 'น้ำหนักน้อยหรือผอม';
        break;
      case (BMI >= 18.5 && BMI < 23):
        status = 'ปกติ (สุขภาพดี)';
        break;
      case (BMI >= 23 && BMI < 25):
        status = 'ท้วม / อ้วนระดับ 1';
        break;
      case (BMI >= 25 && BMI < 30):
        status = 'อ้วนระดับ 2';
        break;
      default:
        status = 'อ้วนระดับ 3';
        break;
    }
    return {
      "BMI": BMI,
      "status": status,
    }
  }
}