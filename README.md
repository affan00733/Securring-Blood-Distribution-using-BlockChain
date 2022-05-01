# Securring-Blood-Distribution-using-BlockChain


### A blood distribution system that not only ensures the immutability of the donor’s data but also provides transparency, and effective management of surplus blood, and prevents blood distribution frauds.

## Links : 

- [Video Demo](https://youtu.be/YA6vNJ2AvEg)
- [Hosted Live Here](https://ekrakt.netlify.app/)
- [Deployed Matic Polygon Blockchain Network](https://mumbai.polygonscan.com/address/0xFf4D391053fAde548A21fA9Cc032b9b85375f0ED)

### What are we solving :

![Alt text](1.png?raw=true "Title")

## Our system design is as follows :

![Alt text](3.png?raw=true "Title")

- Donors can donate blood, possibly at the campsite or at the blood bank itself.
- Information about the donated blood is recorded in the blockchain. A new block of data consisting of Information like Aadhaar numbers, blood group, blood ID, Etc. is appended to the Blood Store.
- This blood is not yet verified, and hence it cannot be classified as safe or unsafe. Now the blood is taken to the blood inspection center, where after physically checking it, the Blood will be declared as ''Tested and Safe'' or ''Tested and Unsafe''.
- As this happens, a QR code will be generated which is the combination of Aadhaar numbers, blood ID, and Batch number's hash.
- This QR code will be automatically downloaded and is to be stuck on the physical blood packets.
- The Donor will be notified in both cases about the acceptance or discarding of his blood.
- The blood, which is marked ''Tested and Safe'' can now be used for patients.
- Now, on the Hospital side, if blood is required, they have to specify the required blood group and the patient’s Aadhaar number for whom the blood is required to keep the accountability and dignity of the hospital intact (ensuring that the hospital does not showcase any fraudulent behavior by selling the blood in black).
- Then our algorithm will search for the most optimal blood bank based on the Deciding factor. Deciding Factor Formula is calculated based on the thought that the distance between the two entities must be as minimum as possible. They must have a greater quantity of blood available.
- After finding the optimal blood bank, the Blood will be transferred from that blood bank to the current Hospital.
- Then the Hospital can see details of the Blood they have received virtually. They can also view the location of the blood bank on Google Maps, and finally, when the Blood is received physically, they can upload the QR code present on the Blood and verify the correct Blood is received.
- Hospitals and blood banks also have the functionality to log in where they need to enter their email and the admin would provide a password. Each transaction that contains the functionality of transferring or creating an asset must be verified and confirmed with a meta mask wallet.
- The Blood donors can also track the history of their Blood without any login or registration, just by entering their Aadhar number and the blood Id.

## A basic overview of our entire system :

![Alt text](4.png?raw=true "Title")

## Conclusion :

- The proposed blockchain-based solution ensures visibility through traceability.
- The QR code authentication and encrypted transactions ensure the integrity of blood reaching the patient.
- The optimization algorithm ensures the availability of blood in the hospitals at all times.
- Possibilities of scarcities of blood during cases of emergencies are eliminated.
- Lack of transparency in traditional systems is eliminated.

## Installation Steps:

1. Clone The repo
2. npm install in the terminal in the root directory
3. Npm start - you can see the demo in localhost port 3000.
4. Registrion needed by the code , if not registered in Mumbai Polygon Test Network
