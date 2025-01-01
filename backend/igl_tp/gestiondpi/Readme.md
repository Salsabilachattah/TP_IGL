# Running Unit Tests

Follow the steps below to run the tests on the search by SSN of a patient:

## Prerequisites

- Make sure you have Python installed on your system.
- Install the required dependencies by running:
    ```bash
    pip install -r requirements.txt
    ```
- Activate your virtual environment :
    ```bash
    source venv/bin/activate  # On Unix or MacOS
    .\venv\Scripts\activate   # On Windows
    ```

## Running Tests

1. Navigate to the project directory:
     ```bash
     cd path/to/gestiondpi
     ```

2. Run the first unit test:
     ```bash
    python manage.py test gestiondpi.tests.TestSearchPatient.test_search_patient_success
     ```

3. Run the second unit test:
     ```bash
    python manage.py test gestiondpi.tests.TestSearchPatient.test_search_patient_not_found
     ```

4. This command will discover and run all the unit tests:
     ```bash
    python manage.py test gestiondpi.tests
     ```

## Viewing Test Results

After running the tests, you will see the results in the terminal. The output will indicate which tests passed and which tests failed, along with any error messages or stack traces.