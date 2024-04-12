import { useState } from "react";
import { Button } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";

export default function BMIPage() {
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [BMIResult, setBMIResult] = useState(0);
    const [BMIStrResult, setBMIStrResult] = useState("");

    const BMICal = (e, weight, height) => {
        e.preventDefault();
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
            setBMIResult(BMI);
            setBMIStrResult(status);
        }
    }

    return (
        <div className="w-9/12 h-full">
            <form onSubmit={(e) => BMICal(e, weight, height)} className="bg-white rounded-lg mt-10 p-5">
                <p className="text-center text-2xl font-bold my-3">BMI Calculator</p>
                <InputComponent type={"number"} value={weight} setValue={setWeight} label={"Weight (kg)"} invalidText={"กรุณากรอกน้ำหนัก"} />
                <InputComponent type={"number"} value={height} setValue={setHeight} label={"Height (cm)"} invalidText={"กรุณากรอกความสูง"} />
                <Button type="submit" className="my-3 w-full" color="success" size="lg">
                    Calculate
                </Button>
                <div className="border-solid border-1 border-green-500 flex flex-col justify-center items-center mt-3 py-3 rounded-xl">
                    <p>BMI</p>
                    <p className="text-3xl my-3">{BMIResult}</p>
                    <p>{BMIStrResult}</p>
                </div>
            </form>
        </div>
    )
}