import { useState } from 'react';
import './index.scss';
import CardContactBook from './Card';

function ContactBookPage() {
    const [listContact, setListContact] = useState([]);
    const [status, setStatus] = useState('add');
    const [indexUpdate, setIndexUpdate] = useState(-1);
    const [info, setInfo] = useState({
        name: '',
        city: '',
    });
    const handleClickAU = () => {
        if (!(info.name !== '' && info.city !== '')) return;
        if (status === 'add') {
            setListContact((prev) => [
                ...prev,
                {
                    name: info.name,
                    city: info.city,
                },
            ]);
        } else {
            setListContact((prev) =>
                [...prev].map((contact, index) => {
                    if (index !== indexUpdate) return contact;
                    else
                        return { ...contact, name: info.name, city: info.city };
                })
            );
            setStatus('add');
        }
        setInfo({
            name: '',
            city: '',
        });
    };
    const handleClickEdit = (index) => {
        setStatus('update');
        setIndexUpdate(index);
        setInfo((prev) => ({
            ...prev,
            name: listContact[index].name,
            city: listContact[index].city,
        }));
    };
    const handleClickDelete = (indexDelete) => {
        setListContact((prev) =>
            [...prev].filter((item, index) => index !== indexDelete)
        );
        setInfo({
            name: '',
            city: '',
        });
        setStatus('add');
    };
    return (
        <div className="container-contact-book">
            <div className="input-contact">
                <h2>Add a new contact</h2>

                <div className="form-container">
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            value={info.name}
                            name="name"
                            onChange={(e) =>
                                setInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div className="form-control">
                        <label>City</label>
                        <input
                            type="text"
                            value={info.city}
                            name="city"
                            onChange={(e) =>
                                setInfo((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <button onClick={handleClickAU}>
                        {status === 'add' ? 'Add contact' : 'Update contact'}
                    </button>
                </div>
            </div>

            <div className="list-contact">
                {listContact.map((contact, index) => (
                    <CardContactBook
                        key={index}
                        index={index}
                        contact={contact}
                        onClickEdit={handleClickEdit}
                        onClickDelete={handleClickDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default ContactBookPage;
