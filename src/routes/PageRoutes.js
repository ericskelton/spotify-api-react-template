import react, {useHistory} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeRoute from "./Home/HomeRoute";
import Callback from "./Callback";
import ToolBar from '../ui/ToolBar'
import NotFound from './NotFound/NotFound'

  
export default function PageRouter(props) {
    console.log('fuuuuck')
    return (
        <BrowserRouter>
            <Routes>
            
                <Route path="/" element={<ToolBar/>}>
                    <Route index element={<HomeRoute/>}/>
                    <Route path="callback" element={<Callback/>} />
                    <Route path='*' element={<NotFound/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
    );
}
