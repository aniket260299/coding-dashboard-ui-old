import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import DashboardService from '../service/DashboardService';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-chrome';

const EditDashboard = () => {
    const initialFormState = {
        id: '',
        title: '',
        solution: '',
        hint: '',
        notes: '',
        link: '',
        difficulty: '',
        tags: '',
        date_created: '',
        date_updated: '',
        username: ''
    };
    const [dashboard, setDashboard] = useState(initialFormState);
    const navigate = useNavigate();
    const { data } = useLocation().state;

    useEffect(() => {
        if (data) setDashboard(data);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target

        setDashboard({ ...dashboard, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let currentTime = new Date().getTime();
        dashboard.date_updated = currentTime;
        dashboard.id ? dashboard.date_updated = currentTime : dashboard.date_created = currentTime;
        const response = dashboard.id ? DashboardService.updateDashboard(dashboard) : DashboardService.addDashboard(dashboard);
        response.then(result => {
            setDashboard(initialFormState);
            navigate('/dashboards/', { state: { data: result.data } });
        });
    }

    const title = <h2>{dashboard.id ? 'Edit Dashboard' : 'Add Dashboard'}</h2>;

    return (<div>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" value={dashboard.title || ''}
                        onChange={handleChange} autoComplete="title" />
                </FormGroup>
                <FormGroup>
                    <Label for="solution">Solution</Label>
                    <AceEditor
                        mode="java"
                        theme="chrome"
                        id="solution"
                        value={dashboard.solution || ''}
                        onChange={data => handleChange({ target: { value: data, name: 'solution' } })}
                        name="solution"
                        autoComplete="solution"
                        editorProps={{ $blockScrolling: true }}
                        width="100%"
                        height="320px"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="hint">Hint</Label>
                    <Input type="text" name="hint" id="hint" value={dashboard.hint || ''}
                        onChange={handleChange} autoComplete="hint" />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="text" name="notes" id="notes" value={dashboard.notes || ''}
                        onChange={handleChange} autoComplete="notes" />
                </FormGroup>
                <FormGroup>
                    <Label for="link">Link</Label>
                    <Input type="text" name="link" id="link" value={dashboard.link || ''}
                        onChange={handleChange} autoComplete="link" />
                </FormGroup>
                <FormGroup>
                    <Label for="difficulty">Difficulty</Label>
                    <Input type="text" name="difficulty" id="difficulty" value={dashboard.difficulty || ''}
                        onChange={handleChange} autoComplete="difficulty" />
                </FormGroup>
                <FormGroup>
                    <Label for="tags">Tags</Label>
                    <Input type="text" name="tags" id="tags" value={dashboard.tags || ''}
                        onChange={handleChange} autoComplete="tags" />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/dashboards">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )
};

export default EditDashboard;