import { Link } from "react-router-dom";

const LinkCard = ({ url }) => {
    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
            <img className="h-32 object-contain ring ring-blue-600 self-start" src="./banner.jpeg" alt="Qr Code" />
            {/* <Link to={`link/${}`}></Link> */}
        </div>
    );
};

export default LinkCard;
