import BMIDetailComponent from "../components/BMIDetailComponent";
import BMIDetail from "../data/BMIDetail";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { BMICal } from "../services/BMICal";

export default function BMIPage() {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [BMIResult, setBMIResult] = useState(0);
  const [BMIStrResult, setBMIStrResult] = useState("");

  const BMICalSetResult = (e) => {
    e.preventDefault();
    const {BMI, status} = BMICal(weight, height);
    setBMIResult(BMI);
    setBMIStrResult(status);
  }

  return (
    <div className="flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-xl">
        <form onSubmit={(e) => BMICalSetResult(e)} className="mt-10">
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

      <div className="w-full max-w-3xl my-10">
        <div className="flex items-center justify-center mb-20">
          <table className="table-auto border-collapse border border-zinc-800">
            <thead>
              <tr>
                <th className="border-1 border-zinc-800 bg-green-500 py-3 px-5">BMI</th>
                <th className="border-1 border-zinc-800 bg-green-500 py-3 px-5">อยู่ในเกณท์</th>
                <th className="border-1 border-zinc-800 bg-green-500 py-3 px-5">ภาวะเสี่ยงต่อโรค</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-1 border-zinc-400 py-3 px-5">น้อยกว่า 18.50</td>
                <td className="border-1 border-zinc-400 py-3 px-5">น้ำหนักน้อย / ผอม</td>
                <td className="border-1 border-zinc-400 py-3 px-5">มากกว่าคนปกติ</td>
              </tr>
              <tr>
                <td className="border-1 border-zinc-400 py-3 px-5">ระหว่าง 18.50 - 22.90</td>
                <td className="border-1 border-zinc-400 py-3 px-5">ปกติ (สุขภาพดี)</td>
                <td className="border-1 border-zinc-400 py-3 px-5">เท่าคนปกติ</td>
              </tr>
              <tr>
                <td className="border-1 border-zinc-400 py-3 px-5">ระหว่าง 23 - 24.90</td>
                <td className="border-1 border-zinc-400 py-3 px-5">ท้วม / โรคอ้วนระดับ 1</td>
                <td className="border-1 border-zinc-400 py-3 px-5">อันตรายระดับ 1</td>
              </tr>
              <tr>
                <td className="border-1 border-zinc-400 py-3 px-5">ระหว่าง 25 - 29.90</td>
                <td className="border-1 border-zinc-400 py-3 px-5">อ้วน / โรคอ้วนระดับ 2</td>
                <td className="border-1 border-zinc-400 py-3 px-5">อันตรายระดับ 2</td>
              </tr>
              <tr>
                <td className="border-1 border-zinc-400 py-3 px-5">มากกว่า 30</td>
                <td className="border-1 border-zinc-400 py-3 px-5">อ้วนมาก / โรคอ้วนระดับ 3</td>
                <td className="border-1 border-zinc-400 py-3 px-5">อันตรายระดับ 3</td>
              </tr>
            </tbody>
          </table>
        </div>

        {BMIDetail.map((item, index) => {
          return <BMIDetailComponent key={index} title={item.title} detail={item.detail} fullDetail={item.fullDetail} recommand={item.recommand} />
        })}
      </div>
    </div>)
}