// VECTOR METHODS
enum XYwCoord {
    //%block='x'
    X,
    //%block='y'
    Y,
    //%block='w'
    W
}

/**
 * Vector and Matrix classes to work in 2D
 */
//% color=190 weight=100 icon="\uf1ec" block="2D Math"
//% groups=['Vector creation', 'Vector operations', 'Matrix creation', 'Matrix operations]
namespace Math2d {
    export class VectorXYw extends Math2d3d.Vector {
        private constructor() {
            super()
        }

        private init(x: number, y: number, w: number): VectorXYw {
            this._[0] = x; this._[1] = y; this._[2] = w
            return this
        }

        public static position(x: number, y: number): VectorXYw {
            return new VectorXYw().init(x, y, 1)
        }

        public static direction(x: number, y: number): VectorXYw {
            return new VectorXYw().init(x, y, 0)
        }

        public static zero(): VectorXYw {
            return VectorXYw.direction(0, 0)
        }

        public factory(): VectorXYw {
            return new VectorXYw()
        }

        public getX(): number { return this._[0] }
        public setX(val: number): void { this._[0] = val }
        public getY(): number { return this._[1] }
        public setY(val: number): void { this._[1] = val }
        public getW(): number { return this._[2] }
        public setW(val: number): void { this._[2] = val }
    }

    export class Matrix33 extends Math2d3d.Matrix {
        private constructor() {
            super()
        }

        public static identity(): Matrix33 {
            let ret = new Matrix33()
            let _ = ret._
            _[0] = 1; _[1] = 0; _[2] = 0
            _[3] = 0; _[4] = 1; _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 0
            return ret
        }

        public static rotation(t: number): Matrix33 {
            let ret = new Matrix33()
            let _ = ret._
            _[0] = Math.cos(t); _[1] = -Math.sin(t); _[2] = 0
            _[3] = Math.sin(t); _[4] = Math.cos(t); _[5] = 0
            _[6] = 0; _[7] = 0; _[8] = 1
            return ret
        }

        public factory(): Matrix33 {
            return new Matrix33()
        }

        public mul(v: VectorXYw): VectorXYw {
            let r = VectorXYw.zero()
            let _ = this._

            /*
            r._[0] = v.dot(this.getXAxis())
            r._[1] = v.dot(this.getYAxis())
            r._[2] = v.dot(this.getTranslation())
            */

            r._[0] = _[0] * v._[0] + _[1] * v._[1] + _[2] * v._[2]
            r._[1] = _[3] * v._[0] + _[4] * v._[1] + _[5] * v._[2]
            r._[2] = _[6] * v._[0] + _[7] * v._[1] + _[8] * v._[2]
            return r
        }

        public transpose(): Matrix33 {
            let r = new Matrix33()
            let _ = this._
            r._[0] = _[0]; r._[1] = _[3]; r._[2] = _[6]
            r._[3] = _[1]; r._[4] = _[4]; r._[5] = _[7]
            r._[6] = _[2]; r._[7] = _[5]; r._[8] = _[8]
            return r
        }

        public getXAxis(): VectorXYw {
            return VectorXYw.direction(this._[0], this._[1])
        }

        public setXAxis(v: VectorXYw): void {
            this._[0] = v._[0]; this._[1] = v._[1]; this._[2] = 0
        }

        public getYAxis(): VectorXYw {
            return VectorXYw.direction(this._[3], this._[4])
        }

        public setYAxis(v: VectorXYw): void {
            this._[3] = v._[0]; this._[4] = v._[1]; this._[5] = 0
        }

        public getTranslation(): VectorXYw {
            return VectorXYw.position(this._[6], this._[7])
        }

        public setTranslation(v: VectorXYw) {
            this._[6] = v._[0]; this._[7] = v._[1]; this._[8] = 1
        }
    }

    // FACTORY METHODS

    //%block="create a 2D position vector at coords (x %x, y %y)"
    //%blockSetVariable=vec
    //%group='Vector creation'
    export function createPositionVectorXYw(x: number, y: number) {
        return VectorXYw.position(x, y)
    }

    //%block="create a 2D direction/offset vector of (x %x, y %y)"
    //%blockSetVariable=vec
    //%group='Vector creation'
    export function createDirectionVectorXYw(x: number, y: number) {
        return VectorXYw.direction(x, y)
    }

    //%block="create a 2D vector which is all zeroes"
    //%blockSetVariable=vec
    //%group='Vector creation'
    export function createZeroVectorXYw() {
        return VectorXYw.zero()
    }

    //%block="create a 2D identity matrix"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createIdentityMatrix() {
        return Matrix33.identity()
    }

    //%block="create a 2D rotation matrix around $degs degrees"
    //%blockSetVariable=mat
    //%degs.shadow="protractorPicker"
    //%group='Matrix creation'
    export function createRotationMatrixDegrees(degs: number) {
        return Matrix33.rotation(degs * 0.01745329252)
    }

    //%block="create a 2D rotation matrix around $rads radians"
    //%blockSetVariable=mat
    //%group='Matrix creation'
    export function createRotationMatrixRadians(rads: number) {
        return Matrix33.rotation(rads)
    }

    //%block="get %v=variables_get(vec)'s %c coordinate"
    export function getVectorCoord(v: VectorXYw, c: XYwCoord): number {
        switch (c) {
            case XYwCoord.X: return v.getX()
            case XYwCoord.Y: return v.getY()
            case XYwCoord.W: return v.getW()
        }
    }

    //%block="set %v=variables_get(vec)'s %c coordinate to %val"
    export function setVectorCoord(v: VectorXYw, c: XYwCoord, val: number) {
        switch (c) {
            case XYwCoord.X: v.setX(val)
            case XYwCoord.Y: v.setY(val)
            case XYwCoord.W: v.setW(val)
        }
    }

    //%block="compute the squared magnitude of %v=variables_get(vec)"
    //%group='Vector operations'
    export function vectorMagSquared(v: VectorXYw): number {
        return v.magSquared()
    }

    //%block="compute the magnitude of %v=variables_get(vec)"
    //%group='Vector operations'
    export function vectorMag(v: VectorXYw): number {
        return v.mag()
    }

    //%block="normalize %v=variables_get(vec)"
    export function vectorNormalize(v: VectorXYw) {
        v.normalize()
    }

    //%block="add %v1=variables_get(vec1) to %v2=variables_get(vec2)"
    //%group='Vector operations'
    export function vectorAdd(v1: VectorXYw, v2: VectorXYw): VectorXYw {
        return v1.add(v2)
    }

    //%block="from %v1=variables_get(vec1) subtract %v2=variables_get(vec2)"
    //%group='Vector operations'
    export function vectorSub(v1: VectorXYw, v2: VectorXYw): VectorXYw {
        return v1.sub(v2)
    }

    //%block="compute the dot(scalar) product of %v1=variables_get(vec1) and %v2=variables_get(vec2)"
    //%group='Vector operations'
    export function vectorDot(v1: VectorXYw, v2: VectorXYw): number {
        return v1.dot(v2)
    }

    // MATRIX OPERATIONS

    /**
     * If the Matrix is well-formed, this is the same as inverse()
     */
    //%block="normalize %m=variables_get(mat)"
    //%group='Matrix operations'
    export function matrixTranspose(m: Matrix33) : Matrix33 {
        return m.transpose()
    }

    //%block="apply %m=variables_get(mat) to %v=variables_get(vec)"
    //%group='Matrix operations'
    export function matrixApply(m: Matrix33, v: VectorXYw) : VectorXYw {
        return m.mul(v)
    }
}