import React, { useState } from 'react';

const CreateMonitorForm = ({ onMonitorCreated }) => {
  const [formVisible, setFormVisible] = useState(false);
  const jsonData = {
    name: "",
    type: "",
    // "status": " ",
    query: "",
    message: "",
  };
  const [formData, setFormData] = useState(jsonData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch('/api/monitor', {
        method: "POST",
        redirect: "follow",
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': process.env.REACT_APP_DATADOG_API_KEY,
          'DD-APPLICATION-KEY': process.env.REACT_APP_DATADOG_APP_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create monitor');
      }

      const newMonitor = await response.json();
      console.log('New monitor created:', newMonitor);
      onMonitorCreated(newMonitor);
      setFormVisible(false);
    } catch (error) {
      console.error('Error creating monitor:', error);
      throw error;
    }
  };

  return (
    <div>
      <button onClick={() => setFormVisible(!formVisible)} className='btn btn-light text-dark mb-5'>Create New Monitor</button>
      {formVisible && (
        <>
          <h5>New Monitor</h5>
          <form onSubmit={handleSubmit} className='d-flex justify-content-around align-items-end gap-3 mt-4'>
            <label>
              Monitor Name:
              <input name="name" type="text" value={formData.name} placeholder='Example: CPU Usage Stats' onChange={handleChange} className='form-control' required />
            </label>

            <label>
              Monitor Type:
              <input name="type" type="text" value={formData.type} placeholder='Ex: query alert' onChange={handleChange} className='form-control' required />
            </label>

            {/* <label>
              Status:
              <input name="status" type="text" value={formData.status} onChange={handleChange} required />
            </label> */}

            <label>
              Message:
              <input name="message" type="text" value={formData.message} onChange={handleChange} placeholder='Enter your Message' className='form-control' required />
            </label>

            <label>
              Query:
              <input name="query" type="text" value={formData.query} onChange={handleChange} placeholder='Enter the Query' className='form-control' required />
            </label>

            <div>
              <button type="submit" className='btn btn-success'>Submit</button>
            </div>

          </form>
        </>

      )}

    </div>
  );
};

export default CreateMonitorForm;
