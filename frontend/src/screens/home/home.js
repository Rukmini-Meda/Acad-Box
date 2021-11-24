import './home.css';
import {Link} from "react-router-dom"

function Home(){
    return (
        <div className="home">
             <h1 className="title">Online Scheduler</h1>
             <div className="box"></div>
                 <Link to="/faculty">
                   <button>
                    Faculty
                   </button>
                </Link>
                <Link to="/students">
                    <button>
                        Students
                    </button>
                </Link>
        </div>
    );
}

export default Home;