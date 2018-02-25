export function commarize (num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

export function convertToH (_rate, _unit) {
    var _H = parseFloat(_rate);

    switch (_unit) {
        case 'h':
            return _H;
            break;
        case 'kh':
            return _H * 1000;
            break;
        case 'mh':
            return _H * 1000000;
            break;
        case 'gh':
            return _H * 1000000000;
            break;
        case 'th':
            return _H * 1000000000000000;
            break;

    }
}

export function  _formatNumber (num, price) {
    let _num = num;

    if (price) {
        if (Math.abs(_num) >= 0.009) {
            _num = num.toFixed(2)
        }

        if (Math.abs(_num) < 0.009) {
            console.log('num', num)
            _num = num.toFixed(6)
        }
    } else {
        if (Math.abs(_num) < 1) {
            _num = parseFloat(num.toFixed(6))
        }

        if (Math.abs(_num) > 1) {
            _num = parseFloat(num.toFixed(0))
        }
    }
    return _num
}