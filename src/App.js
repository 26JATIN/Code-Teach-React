import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes'; // Import routes from a separate file

const App = () => {
    return (
        <Router>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component />} // Use `element` instead of `component`
                    />
                ))}
            </Routes>
        </Router>
    );
};

export default App;
