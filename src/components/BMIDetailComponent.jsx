export default function BMIDetailComponent({title, detail, fullDetail, recommand}) {
  return <div className="py-2">
    <h4 className="text-2xl font-bold mb-1">{title}</h4>
    <h3 className="text-xl font-bold mb-3">{detail}</h3>
    <p>{fullDetail}</p>
    <h4 className="text-xl font-bold my-3">ข้อแนะนำ</h4>
    {recommand.map((item, index) => {
      return <p key={index} className="my-2">{`${index + 1}. ${item}`}</p>
    })}
  </div>
}