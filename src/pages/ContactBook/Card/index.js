function CardContactBook({ contact, index, onClickEdit, onClickDelete }) {
    return (
        <div
            style={{
                padding: '20px 8px 8px 8px',
                border: '1px solid #52bbe3',
                display: 'flex',
            }}
        >
            <div style={{ flex: 1 }}>
                <h2>{contact.name}</h2>
                <p style={{ marginTop: '16px' }}>City: {contact.city}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                    style={{
                        padding: '2px 6px',
                        fontSize: '16px',
                        minWidth: '60px',
                    }}
                    onClick={() => onClickEdit(index)}
                >
                    Edit
                </button>
                <button
                    style={{
                        padding: '2px 2px',
                        fontSize: '16px',
                        minWidth: '60px',
                    }}
                    onClick={() => onClickDelete(index)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default CardContactBook;
