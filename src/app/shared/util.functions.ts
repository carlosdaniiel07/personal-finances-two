// SweetAlert
import swal from 'sweetalert'


export class Util {
	// convert a date string ddMMyyyy to dd/MM/yyyy
	public static toDateFormat(obj: string): string {
		if(obj === null || obj.length != 8){
			return ""
		} else{
			return (obj.substring(0, 2) + '/' + obj.substring(4, 2) + "/" + obj.substring(8, 4))
		}
	}

	// convert a date string dd/MM/yyyy to MM/dd/yyyy
	public static toEnglishFormat(obj: string): string {
		if (obj === null || obj.length != 10){
			return ""
		} else {
			let split: string[] = obj.split('/')
			return (split[1] + '/' + split[0] + '/' + split[2])
		}
	}

	// convert a API date string (yyyy-dd-MM) to date string (ddMMyyyy)
	public static convertFromApi(obj: string): string {
		if (obj === null || obj.length < 8){
			return ""
		} else {
			let split: string[] = obj.substring(0, 10).split('-')
			return (split[2] + split[1] + split[0]) 
		}
	}

	// show a success modal (SweetAlert)
	public static successNotify(message: string, title: string = 'Success'): void {
		swal({
			title: title,
			text: message,
			icon: 'success'
		})
	}

	// show a error modal (SweetAlert)
	public static errorNotify(message: string, title: string = 'Error'): void {
		swal({
			title: title,
			text: message,
			icon: 'error'	
		})
	}

	// show a generic modal (SweetAlert)
	public static genericNotify(message: string, title: string = ''): void {
		swal({
			title: title,
			text: message,
			buttons: [''],
			timer: 3000
		})
	}

	// show a confirm modal with 'Cancel' and 'OK' buttons. Return true if 'OK' and false if 'Cancel'
	public static confirmNotify(message: string, title: string = 'Alert'): Promise<any> {
		return new Promise<any>((result, failure) => {
			swal({
				title: title,
				text: message,
				icon: 'warning',
				buttons: ['Cancel', 'OK'],
				dangerMode: true
			}).then((option) => result(option === null ? false : true))
		})
	}
}