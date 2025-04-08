export default function DataInputs({dataProps,setDataProp}) {
    const {phone = '',dept = '',register= ''} = dataProps;
  return (
    <>
      <label>Phone Number</label>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => setDataProp('phone' , ev.target.value)}
      />
      <label>Department/Class</label>
      <input
        type="text"
        placeholder="Department"
        value={dept}
        onChange={(ev) => setDataProp('dept' , ev.target.value)}
      />
      <label>Register Number</label>
      <input
        type="text"
        placeholder="Reg Number"
        value={register}
        onChange={(ev) => setDataProp('register' , ev.target.value)}
      />
    </>
  );
}
