import React, { useEffect } from 'react';
import { useParams, useHistory, Link, Redirect } from 'react-router-dom';

const Color = ({ colors }) => {
    const { color } = useParams();
    const history = useHistory();
    
    const selectedColor = colors.find((c) => c === color);

    useEffect(() => {
        if (!selectedColor) {
            history.push('/colors');
            return;
        }
        document.body.style.backgroundColor = selectedColor;

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [selectedColor, history]);


    return (
        <>
            <div className='color-links'>
                <h1 className='title'>{selectedColor}!</h1>
                <Link exact to="/colors">
                    Back
                </Link>
            </div>
        </>
    );
};


export default Color;