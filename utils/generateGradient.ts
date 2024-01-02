const gradients = [
    'text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500',
    'text-white bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600',
    'bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400',
    'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
    'bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-green-200 via-green-300 to-blue-500',
    'bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-400 to-yellow-700',
    'text-white bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-200 to-red-600',
    'bg-gradient-to-t from-indigo-300 to-purple-400',
    'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500',
    'text-white bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500',
    'bg-gradient-to-br from-pink-400 to-pink-600'
]

// @ts-ignore
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

export default function generateGradient() {
    // @ts-ignore
    return gradients.random()
}