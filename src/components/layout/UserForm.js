'use client';
import EditableImage from "@/components/layout/EditableImage";
import DataInputs from "@/components/layout/DataInputs";
import {useState} from "react";
import {useProfile} from "@/components/UseProfile";

export default function UserForm({user,onSave}) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [dept, setDept] = useState(user?.dept || '');
    const [register, setRegister] = useState(user?.register || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const {data:loggedInUserData} = useProfile();

    function handleDataChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'dept') setDept(value);
        if (propName === 'register') setRegister(value);
    }

    return (
        <div className="md:flex gap-4">
                            <div>
                                <div className="p-4 rounded-lg relative max-w-[120px]">
                                    <EditableImage link={image} setLink={setImage} />
                                </div>
                            </div>
                            <form className="grow" onSubmit={ev =>
                                onSave(ev, {
                                  name:userName, image, phone, admin,
                                  dept,register,
                                })}>
                                <label>First and Last name</label>
                                <input type="text" placeholder="first and last name "
                                    value={userName} onChange={ev => setUserName(ev.target.value)} />
                                <label>Email</label>
                                <input type="email" disabled={true} value={user.email} />
                                <DataInputs
                                dataProps={{phone,dept,register}}
                                setDataProp={handleDataChange}
                                 />
                                {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className="" value={'1'}
                checked={admin}
                onChange={ev => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
                                <button type="submit">Save</button>
                            </form>
                        </div>
    );
}