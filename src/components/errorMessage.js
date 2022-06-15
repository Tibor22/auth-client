import './errorMessage.css';

export default function ErrorMessage({msg}) {
    return (
        <div className="error-container">
            <p className="error">{msg}</p>
        </div>
    )
}