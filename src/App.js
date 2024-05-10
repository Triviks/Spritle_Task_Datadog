import MonitorTable from './components/MonitorTable';
import CreateMonitorForm from './components/CreateMonitorForm';

const App = () => {
  return (
    <div className="container">
      <h1 className='display-6 pt-5'>My ORG - DataDog Monitors</h1>
      <MonitorTable />
      <CreateMonitorForm />
    </div>
  );
};

export default App;
