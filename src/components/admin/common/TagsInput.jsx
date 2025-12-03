import React, { useState } from 'react';
import { Form, Badge } from "react-bootstrap";

const TagsInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();

        
            const newTags = inputValue
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag !== '');

        
            setTags((prevTags) => [...new Set([...prevTags, ...newTags])]);

            setInputValue('');
        }
    };


    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <Form.Group className="mb-3" controlId="customTags">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                    <Badge key={tag} bg="secondary" className="d-inline-flex align-items-center px-2 py-1">
                        {tag}
                        <button
                            type="button"
                            className="btn-close btn-close-white ms-1"
                            aria-label="Remove tag"
                            onClick={() => handleRemoveTag(tag)}
                            style={{ fontSize: "0.4rem" }}
                        ></button>
                    </Badge>
                ))}
            </div>
            <Form.Control
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add tags and press Enter..."
            />
        </Form.Group>
    );
};

export default TagsInput;
