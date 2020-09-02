const DriverModel = require('./../models/driver');
const userModel = require('./../models/user');
const driverModel = require('./../models/driver');
class Driver {
    async handleNew(req,res,next) {
        const body = req.body;
        const status =this.isValidDriverObject(body);
        if(!status.success) {
            res.status(400).json({status});
            return ;
        }

        const answer =await this.saveNewDriverToDB(body);
		console.log(answer.success);
		if(!answer.success) {
			console.log("Here");
            res.status(400).json(answer);
            return ;
		}
		res.status(200).json(answer);

    }
    async saveNewDriverToDB(driverObj) {
        const driverDocument = new DriverModel({
			name:driverObj.name,
			phone_number:driverObj.phone_number
		});
        let result = {success:false,message:""};
        try {
            let savedBody = await driverDocument.save();
            result.success = true;
            result.message = savedBody;
        } catch(err) {
            result.success = false;
            result.message = "Error creating User";
        } finally {
            return result;
        }
    }

    isValidDriverObject(body) {
		const errors = [];
		if(!body) {
			errors.push("No body found");
			return {
				success:false,
				errors:errors
			};
		}
		if(!body.name) errors.push("Invalid name");
		console.log(body.phone_number);
        if(!body.phone_number || body.phone_number.length!=10) errors.push("Invalid Phone Number");
        return {
            success:errors.length===0,
            errors:errors
        };
	}
	
	async handleRate(req,res,next) {
		const body = req.body;
		const valid = this.containsNecessaryFields(body);
		if(!valid.success) {
			res.status(400).json(valid);
			return;
		}
		const result =await this.rateUser(body);
		res.status(result.success?200:500).json(result);
		return ;
	}

	containsNecessaryFields(body) {
		const errors = [];
		if(!body) {
			errors.push("No body found");
			return {
				success:false,
				errors:errors
			};
		}
		if(!body.driver_id) errors.push("No Driver ID Provided");
		if(!body.user_id) errors.push("No Rider ID provided");
		if(!body.rating || body.rating<0 || body.rating>5) errors.push("Invalid Rating Provided");
		return {
            success:errors.length===0,
            errors:errors
        };
	}
    
    async rateUser(body) {
		const result = {success:false,messsage:""};
		try {
			const user = await userModel.findOne({_id:body.user_id});
			user.ratings.push({
				user_id:body.driver_id,
				rating:body.rating
			});

			// Logic for new Rating
			const new_rating = ((user.current_rating * user.num_trips) + body.rating)/(user.num_trips+1);
			user.current_rating = new_rating;
			user.num_trips = user.num_trips + 1;
			const response = await user.save();
			result.success = true;
			result.messsage = response; 
		} catch(err) {
			result.success = false;
			result.messsage = "Could not rate user.";
		} finally {
			return result;
		}
	}

	async handleProfile(req,res,next) {
		const body = req.query;
		if(!body.driver_id) {
			res.status(400).json({success:false,messsage:"No ID provided"});
			return ;
		}
		const result = {success:false,message:""};
		try {
			const info = await driverModel.findById(body.driver_id);
			result.success = true;
			result.message = info;
		} catch(err) {
			result.success = false;
			result.message = "Cannot Find Profile";
		}
		res.status(result.success?200:400).json(result);
	}
    
    

}

module.exports = new Driver();