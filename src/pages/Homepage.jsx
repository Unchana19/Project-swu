import BMIDetailComponent from "../components/BMIDetailComponent";
import BMIDetail from "../data/BMIDetail";

export default function Homepage() {
  return <div className="w-full flex flex-col items-center justify-center">
    <div className="bg-zinc-50 w-9/12 p-10 my-20 rounded-xl">
      <div className="flex items-center justify-center mb-20">
        <table className="table-auto border-collapse border border-zinc-800">
          <thead>
            <tr>
              <th className="border-2 border-zinc-800 bg-green-500 py-3 px-5">BMI</th>
              <th className="border-2 border-zinc-800 bg-green-500 py-3 px-5">อยู่ในเกณท์</th>
              <th className="border-2 border-zinc-800 bg-green-500 py-3 px-5">ภาวะเสี่ยงต่อโรค</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-zinc-800 py-3 px-5">น้อยกว่า 18.50</td>
              <td className="border-2 border-zinc-800 py-3 px-5">น้ำหนักน้อย / ผอม</td>
              <td className="border-2 border-zinc-800 py-3 px-5">มากกว่าคนปกติ</td>
            </tr>
            <tr>
              <td className="border-2 border-zinc-800 py-3 px-5">ระหว่าง 18.50 - 22.90</td>
              <td className="border-2 border-zinc-800 py-3 px-5">ปกติ (สุขภาพดี)</td>
              <td className="border-2 border-zinc-800 py-3 px-5">เท่าคนปกติ</td>
            </tr>
            <tr>
              <td className="border-2 border-zinc-800 py-3 px-5">ระหว่าง 23 - 24.90</td>
              <td className="border-2 border-zinc-800 py-3 px-5">ท้วม / โรคอ้วนระดับ 1</td>
              <td className="border-2 border-zinc-800 py-3 px-5">อันตรายระดับ 1</td>
            </tr>
            <tr>
              <td className="border-2 border-zinc-800 py-3 px-5">ระหว่าง 25 - 29.90</td>
              <td className="border-2 border-zinc-800 py-3 px-5">อ้วน / โรคอ้วนระดับ 2</td>
              <td className="border-2 border-zinc-800 py-3 px-5">อันตรายระดับ 2</td>
            </tr>
            <tr>
              <td className="border-2 border-zinc-800 py-3 px-5">มากกว่า 30</td>
              <td className="border-2 border-zinc-800 py-3 px-5">อ้วนมาก / โรคอ้วนระดับ 3</td>
              <td className="border-2 border-zinc-800 py-3 px-5">อันตรายระดับ 3</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {BMIDetail.map((item, index) => {
        return <BMIDetailComponent key={index} title={item.title} detail={item.detail} fullDetail={item.fullDetail} recommand={item.recommand} />
      })}
    </div>
  </div>
}