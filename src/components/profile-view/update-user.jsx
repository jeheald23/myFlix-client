import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ProfileView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };
        useEffect(() => {
            fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${username}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    window.location.reload();
                } else {
                    alert("Update failed");
                }
            });
        });
    };

     const handleDelete = (event) => {
       event.preventDefault();

       const data = {
         Username: username,
         Password: password,
         Email: email,
         Birthday: birthday
       };

       useEffect(() => {
         fetch(`https://myflixapp-api-3e4d3ace1043.herokuapp.com/users/${username}`, {
           method: "DELETE",
           body: JSON.stringify(data),
           headers: {
             "Content-Type": "application/json"
           }
         }).then((response) => {
           if (response.ok) {
             alert("Profile delete successfully");
             window.location.reload();
           } else {
             alert("Unable to delete profile");
           }
         });
       });
     };

    return (
        <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="update">
                Update Profile
            </Button>
            <Button variant="primary" type="delete">
                Delete Profile
            </Button>
        </Form>
    );
};